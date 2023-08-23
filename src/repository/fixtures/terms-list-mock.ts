export interface TermItem {
  term: string,
  definition: string,
  id: string
}

export const termsList: TermItem[] = [
  {
    id: '1',
    term: 'accommodation',
    definition: `**a place to live, work or stay in**

- rented / temporary _____________.
- Hotel _____________ is included in the price of your holiday.
- We may have to provide alternative _____________
for you.`
  },
  {
    id: '2',
    term: 'beyond',
    definition: `**on or to the further side of something**

- The road continues ______ the village up into the hills.
- In the distance, ______ the river, was a small town.

---

**more than something**

- She's got nothing ______ her state pension.`
  },
  {
    id: '3',
    term: 'investigate',
    definition: `to carefully examine the facts of a situation, an event, a crime, etc. to find out the truth about it or how it happened

The FBI has been called in to ________.

'What was that noise?' 'I'll go and ________.'`
  },
  {
    id: '4',
    term: 'narrow',
    definition: `measuring a short distance from one side to the other, especially in relation to length

a ______ bed/doorway/shelf.

______ shoulders/hips

There was only a ______ gap between the bed and the wall.`
  }
];
