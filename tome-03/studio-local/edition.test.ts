import test from 'node:test';
import assert from 'node:assert/strict';
import { append, eventFor, nextId } from './core.ts';

const fields = {
  by: 'Lea',
  at: '2026-09-28T10:00:00Z',
  commerce: 'Cafe',
  objectif: 'Trois textes',
  reason: 'Sources relues'
};
const first = eventFor('creer', 'SL-001', 1, fields);

test('identifiant indépendant du nombre de gestes', () => {
  const events = append(
    [first],
    eventFor('soumettre', 'SL-001', 1, fields)
  );
  assert.equal(nextId([]), 'SL-001');
  assert.equal(nextId(events), 'SL-002');
  assert.equal(
    nextId([eventFor('creer', 'SL-099', 1, fields)]),
    'SL-100'
  );
});

test('approbation sans champs parasites', () => {
  const e = eventFor('approuver', 'SL-001', 1, fields);
  assert.equal(e.reason, 'Sources relues');
  assert.equal('commerce' in e, false);
  assert.equal('objectif' in e, false);
});

test('création, soumission et révision ciblées', () => {
  assert.equal('reason' in first, false);
  const submit = eventFor(
    'soumettre',
    'SL-001',
    1,
    fields
  );
  assert.equal('reason' in submit, false);
  assert.equal('objectif' in submit, false);
  const revise = eventFor('reviser', 'SL-001', 1, fields);
  assert.equal(revise.objectif, 'Trois textes');
  assert.equal('commerce' in revise, false);
  assert.equal('reason' in revise, false);
});
