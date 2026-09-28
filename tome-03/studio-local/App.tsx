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
            'Lecture impossible. Donnees conservees.'
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
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Operation refusee'
      );
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
        Studio Local
      </Text>
      <Text>
        Atelier local : donnees fictives uniquement.
      </Text>
      <Text>
        Votre nom (declaration, pas une authentification)
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
        Objectif pour une creation ou une revision
      </Text>
      <TextInput
        style={inputStyle}
        value={objectif}
        onChangeText={setObjectif}
        multiline
        accessibilityLabel="Objectif"
      />
      <Text>Motif de votre prochaine decision</Text>
      <TextInput
        style={inputStyle}
        value={reason}
        onChangeText={setReason}
        multiline
        accessibilityLabel="Motif"
      />
      <Button
        title="Creer une demande"
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
            Revision {b.revision} - {b.status}
          </Text>
          {b.status === 'NOUVEAU' && (
            <Button
              title="Soumettre a relecture"
              disabled={disabled}
              onPress={() =>
                act('soumettre', b.id, b.revision)
              }
            />
          )}
          {b.status === 'A_RELIRE' && (
            <>
              <Button
                title="Approuver cette revision"
                disabled={disabled}
                onPress={() =>
                  act('approuver', b.id, b.revision)
                }
              />
              <Button
                title="Refuser cette revision"
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
                'Reviser ' + b.id,
                'La nouvelle revision devra etre relue : ' +
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
                {e.action} - {e.by} - {e.at}{' '}
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
        Choisissez vous-meme le destinataire dans la
        fenetre de partage.
      </Text>
    </ScrollView>
  );
}
