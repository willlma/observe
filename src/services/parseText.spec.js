import parseText from './parseText';

test('returns some parsed text', () => {
  const now = Date.now();
  const day = 864e5;
  const sentences = [{
    id: 1,
    text: 'I walked my dog',
    occurrences: [
      { timestamp: now, quantities: [1] },
      { timestamp: now - day, quantities: [1] },
      { timestamp: (now - day) * 3, quantities: [1] }
    ]
  }, {
    id: 2,
    text: 'I walked my cat',
    occurrences: [
      { timestamp: now - (day * 2), quantities: [1] },
      { timestamp: now - (day * 4), quantities: [1] }
    ]
  }, {
    id: 3,
    text: 'I walked Matt\'s cat',
    occurrences: [
      { timestamp: now - day, quantities: [1] },
      { timestamp: now - (day * 5), quantities: [1] }
    ]
  }, {
    id: 4,
    text: 'I walked Matt\'s dog',
    occurrences: [
      { timestamp: now - (day * 7), quantities: [1] },
      { timestamp: now - (day * 8), quantities: [1] }
    ]
  // }, {
  //   id: 5,
  //   text: 'I ran \\d miles',
  //   occurrences: [
  //     { timestamp: now, quantities: [3] },
  //     { timestamp: now - day, quantities: [4.5] },
  //     { timestamp: (now - day) * 3, quantities: [1.8] }
  //   ]
  }];
  const oneParsedText = {
    'I walked my': [1, 2],
    'I walked': [1, 2, 3, 4],
  };
  const twoParsedText = {
    'I walked \\w cat': [2, 3],
    // diffs: { my: 2, "Matt's": 3 }
  };

  expect(parseText(1, sentences)).toEqual(oneParsedText);
  expect(parseText(2, sentences)).toEqual(expect.objectContaining(twoParsedText));
});
