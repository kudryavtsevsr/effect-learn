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
  }
];
