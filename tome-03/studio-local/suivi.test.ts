import test from 'node:test';
import assert from 'node:assert/strict';
import { suivi } from './suivi.ts';
import type { Event } from './core.ts';

const event = (
  action: Event['action'],
  extra = {}
): Event => ({
  action,
  id: 'SL-101',
  revision: 1,
  by: 'Lea',
  at: '2026-09-28T10:00:00.000Z',
  ...extra
});
const creation = event('creer', {
  commerce: 'Cafe',
  objectif: 'Preparer trois textes'
});
const soumis = [creation, event('soumettre')];

test('aucun dossier donne quatre compteurs nuls', () => {
  assert.deepEqual(suivi([]), {
    total: 0,
    parStatut: {
      NOUVEAU: 0,
      A_RELIRE: 0,
      APPROUVE: 0,
      REFUSE: 0
    }
  });
});
test('deux evenements representent un seul dossier', () => {
  const bilan = suivi(soumis);
  assert.equal(bilan.total, 1);
  assert.equal(bilan.parStatut.A_RELIRE, 1);
  assert.equal(bilan.parStatut.NOUVEAU, 0);
});
test('une approbation deplace le compteur', () => {
  const bilan = suivi([
    ...soumis,
    event('approuver', { reason: 'Relu' })
  ]);
  assert.equal(bilan.parStatut.APPROUVE, 1);
  assert.equal(bilan.parStatut.A_RELIRE, 0);
});
test('une revision remet le dossier a relire', () => {
  const bilan = suivi([
    ...soumis,
    event('approuver', { reason: 'Relu' }),
    event('reviser', { objectif: 'Preparer deux textes' })
  ]);
  assert.equal(bilan.total, 1);
  assert.equal(bilan.parStatut.APPROUVE, 0);
  assert.equal(bilan.parStatut.A_RELIRE, 1);
});
test('deux dossiers dans les bons etats', () => {
  const bilan = suivi([
    ...soumis,
    event('refuser', { reason: 'A reprendre' }),
    event('creer', {
      id: 'SL-102',
      commerce: 'Atelier',
      objectif: 'Preparer une reponse'
    })
  ]);
  assert.equal(bilan.total, 2);
  assert.equal(bilan.parStatut.REFUSE, 1);
  assert.equal(bilan.parStatut.NOUVEAU, 1);
  const somme = Object.values(bilan.parStatut).reduce(
    (a, b) => a + b,
    0
  );
  assert.equal(somme, bilan.total);
});
test('le journal gele nest pas modifie', () => {
  const journal = Object.freeze(
    soumis.map((e) => Object.freeze({ ...e }))
  );
  const avant = JSON.stringify(journal);
  suivi(journal);
  assert.equal(JSON.stringify(journal), avant);
});
test('historique invalide : erreur visible', () => {
  assert.throws(
    () =>
      suivi([
        creation,
        event('approuver', { reason: 'Trop tot' })
      ]),
    /Relecture/
  );
});
