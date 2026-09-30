import test from 'node:test';
import assert from 'node:assert/strict';
import {
  append,
  replay,
  encode,
  decode,
  csv
} from './core.ts';
import type { Event } from './core.ts';
const event = (
  action: Event['action'],
  extra = {}
): Event => ({
  action,
  id: 'SL-001',
  revision: 1,
  by: 'Lea',
  at: '2026-09-28T10:00:00.000Z',
  ...extra
});
const created = [
  event('creer', {
    commerce: 'Cafe',
    objectif: '3 textes'
  })
];
const review = append(created, event('soumettre'));

test('creation et trajet normal', () => {
  const approved = append(
    review,
    event('approuver', { reason: 'Relu' })
  );
  assert.equal(replay(approved)[0].status, 'APPROUVE');
  assert.equal(replay(created)[0].status, 'NOUVEAU');
});
test('pas de mutation de entree', () => {
  const before = JSON.stringify(created);
  append(created, event('soumettre'));
  assert.equal(JSON.stringify(created), before);
});
test('doublon refuse', () => {
  assert.throws(
    () => append(created, created[0]),
    /deja utilise/
  );
});
test('approbation directe refusee', () => {
  assert.throws(
    () => append(created, event('approuver')),
    /Relecture/
  );
});
test('motif obligatoire', () => {
  assert.throws(
    () => append(review, event('refuser')),
    /Motif/
  );
});
test('revision ancienne refusee', () => {
  assert.throws(
    () =>
      append(
        review,
        event('approuver', {
          revision: 2,
          reason: 'Relu'
        })
      ),
    /perimee/
  );
});
test('revision annule approbation', () => {
  const ok = append(
    review,
    event('approuver', { reason: 'Relu' })
  );
  const changed = append(
    ok,
    event('reviser', { objectif: '2 textes' })
  );
  assert.equal(replay(changed)[0].status, 'A_RELIRE');
  assert.equal(replay(changed)[0].revision, 2);
});
test('aller retour stockage', () => {
  assert.deepEqual(decode(encode(review)), review);
});
test('stockage malforme refuse', () => {
  for (const raw of [
    '{',
    'null',
    '{}',
    '{"schema":2,"events":[]}',
    '{"schema":1,"events":[null]}'
  ]) {
    assert.throws(() => decode(raw));
  }
});
test('action et date invalides refusees', () => {
  assert.throws(
    () => replay([event('creer', { at: 'hier' })]),
    /Date/
  );
  assert.throws(
    () =>
      replay([
        ...created,
        event('inconnu' as Event['action'])
      ]),
    /inconnue/
  );
});
test('export echappe guillemets et formules', () => {
  const data = [
    event('creer', {
      commerce: '=1+1',
      objectif: 'Dire "oui"'
    })
  ];
  assert.match(csv(data), /'=1\+1/);
  assert.match(csv(data), /Dire ""oui""/);
});
test('refus et nouvelle proposition', () => {
  const no = append(
    review,
    event('refuser', { reason: 'Manque une source' })
  );
  const changed = append(
    no,
    event('reviser', { objectif: 'Texte source' })
  );
  assert.equal(replay(changed)[0].status, 'A_RELIRE');
});
test('objectif identique ne cree pas de revision', () => {
  assert.throws(
    () => append(
      review, event('reviser', { objectif: '  3 textes  ' })
    ),
    /Objectif inchange/
  );
});
test('soumission repetee refusee', () => {
  assert.throws(
    () => append(review, event('soumettre')),
    /Dossier deja soumis/
  );
});
test('creation doit commencer en revision un', () => {
  assert.throws(
    () => replay([event('creer', {
      revision: 2, commerce: 'Cafe', objectif: '3 textes'
    })]),
    /Creation attendue en revision 1/
  );
});
test('identite obligatoire pour chaque evenement', () => {
  assert.throws(
    () => append(created, event('soumettre', { by: '  ' })),
    /Identite manquante/
  );
});
