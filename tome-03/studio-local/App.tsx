import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import AsyncStorage from
  '@react-native-async-storage/async-storage';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {
  append,
  replay,
  encode,
  decode,
  csv,
  nextId,
  eventFor
} from './core';
import type { Event } from './core';

const KEY = 'studio-local-reference-v1';
const statusLabel: Record<string, string> = {
  NOUVEAU: 'Nouveau',
  A_RELIRE: 'À relire',
  APPROUVE: 'Approuvé',
  REFUSE: 'Refusé'
};
const actionLabel: Record<Event['action'], string> = {
  creer: 'Création',
  soumettre: 'Soumission',
  approuver: 'Approbation',
  refuser: 'Refus',
  reviser: 'Révision'
};
const errorLabel: Record<string, string> = {
  'Identite manquante': 'Indiquez votre nom.',
  'Revision perimee':
    'Cette révision n’est plus la révision courante.',
  'Dossier deja soumis': 'Ce dossier a déjà été soumis.',
  'Motif requis': 'Indiquez un motif avant de décider.',
  'Objectif requis': 'Indiquez un objectif.',
  'Objectif inchange':
    'Modifiez l’objectif avant de créer une révision.'
};
function readableError(error: unknown): string {
  const message = error instanceof Error
    ? error.message : 'Opération refusée';
  return errorLabel[message] || message;
}
export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const [error, setError] = useState('');
  const [commerce, setCommerce] = useState('');
  const [objectif, setObjectif] = useState('');
  const [by, setBy] = useState('Lea');
  const [reason, setReason] = useState('');
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        const loaded = raw === null ? [] : decode(raw);
        if (active) {
          setEvents(loaded);
          setReady(true);
        }
      })
      .catch(() => {
        if (active)
          setError(
            'Lecture impossible. Données conservées.'
          );
      });
    return () => {
      active = false;
    };
  }, []);

  async function act(
    action: Event['action'],
    id: string,
    revision: number
  ) {
    if (!ready || lock.current) return;
    lock.current = true;
    setBusy(true);
    try {
      const e = eventFor(action, id, revision, {
        by,
        at: new Date().toISOString(),
        commerce,
        objectif,
        reason
      });
      const next = append(events, e);
      await AsyncStorage.setItem(KEY, encode(next));
      setEvents(next);
      setError('');
      if (action === 'creer') {
        setCommerce('');
        setObjectif('');
        setReason('');
      } else if (action === 'reviser') {
        setObjectif('');
      } else if (
        action === 'approuver' || action === 'refuser'
      ) {
        setReason('');
      }
    } catch (err) {
      setError(readableError(err));
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function exportFile(kind: 'csv' | 'json') {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        throw new Error(
          'Partage indisponible sur cet appareil'
        );
      }
      const file = new File(
        Paths.cache,
        'studio-local.' + kind
      );
      file.create({ overwrite: true });
      file.write(
        kind === 'csv' ? csv(events) : encode(events)
      );
      await Sharing.shareAsync(file.uri, {
        mimeType:
          kind === 'csv' ? 'text/csv' : 'application/json'
      });
    } catch (err) {
      Alert.alert(
        'Export',
        err instanceof Error ? err.message : 'Echec'
      );
    }
  }
  const disabled = !ready || busy;
  const inputStyle = {
    borderWidth: 1,
    padding: 10,
    marginVertical: 6
  };
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 24,
        paddingTop: 60
      }}
    >
      <Text
        accessibilityRole="header"
        style={{ fontSize: 25 }}
      >
        Studio Local Mobile
      </Text>
      <Text>
        Atelier local : données fictives uniquement.
      </Text>
      <Text>
        Votre nom (déclaration, pas une authentification)
      </Text>
      <TextInput
        style={inputStyle}
        value={by}
        onChangeText={setBy}
        accessibilityLabel="Votre nom"
      />
      <Text>Commerce pour une nouvelle demande</Text>
      <TextInput
        style={inputStyle}
        value={commerce}
        onChangeText={setCommerce}
        accessibilityLabel="Commerce"
      />
      <Text>
        Objectif pour une création ou une révision
      </Text>
      <TextInput
        style={inputStyle}
        value={objectif}
        onChangeText={setObjectif}
        multiline
        accessibilityLabel="Objectif"
      />
      <Text>Motif de votre prochaine décision</Text>
      <TextInput
        style={inputStyle}
        value={reason}
        onChangeText={setReason}
        multiline
        accessibilityLabel="Motif"
      />
      <Button
        title="Créer une demande"
        disabled={disabled}
        onPress={() => act('creer', nextId(events), 1)}
      />
      {!!error && (
        <Text
          accessibilityRole="alert"
          style={{ color: '#9a2020' }}
        >
          {error}
        </Text>
      )}
      {!ready && !error && <Text>Chargement...</Text>}
      {replay(events).map((b) => (
        <View
          key={b.id}
          style={{
            borderWidth: 1,
            padding: 14,
            marginVertical: 14
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>
            {b.id} - {b.commerce}
          </Text>
          <Text>{b.objectif}</Text>
          <Text>
            Révision {b.revision} — {statusLabel[b.status]}
          </Text>
          {b.status === 'NOUVEAU' && (
            <Button
              title="Soumettre à relecture"
              disabled={disabled}
              onPress={() =>
                act('soumettre', b.id, b.revision)
              }
            />
          )}
          {b.status === 'A_RELIRE' && (
            <>
              <Button
                title="Approuver cette révision"
                disabled={disabled}
                onPress={() =>
                  act('approuver', b.id, b.revision)
                }
              />
              <Button
                title="Refuser cette révision"
                disabled={disabled}
                onPress={() =>
                  act('refuser', b.id, b.revision)
                }
              />
            </>
          )}
          <Button
            title="Remplacer par objectif saisi plus haut"
            disabled={disabled}
            onPress={() =>
              Alert.alert(
                'Réviser ' + b.id,
                'La nouvelle révision devra être relue : ' +
                  objectif,
                [
                  { text: 'Annuler', style: 'cancel' },
                  {
                    text: 'Confirmer',
                    onPress: () =>
                      act('reviser', b.id, b.revision)
                  }
                ]
              )
            }
          />
          {events
            .filter((e) => e.id === b.id)
            .map((e, i) => (
              <Text key={i} style={{ marginTop: 5 }}>
                {actionLabel[e.action]} — {e.by}
                {' — '}{e.at}{' '}
                {e.reason || ''}
              </Text>
            ))}
        </View>
      ))}
      <Button
        title="Partager le tableau CSV"
        disabled={disabled}
        onPress={() => exportFile('csv')}
      />
      <Button
        title="Partager la sauvegarde JSON"
        disabled={disabled}
        onPress={() => exportFile('json')}
      />
      <Text>
        Choisissez vous-même le destinataire dans la
        fenêtre de partage.
      </Text>
    </ScrollView>
  );
}
