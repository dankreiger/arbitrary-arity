// mock file system

interface FileElement {
  name: string;
  data: number;
  subs?: FileElement[];
}

export const makeFileElement = ({
  name,
  data,
  subs
}: FileElement): FileElement => ({
  name,
  data,
  subs
});

const f1 = makeFileElement({ name: 'F1', data: 1 });
const f2 = makeFileElement({ name: 'F2', data: 2 });
const f3 = makeFileElement({ name: 'F3', data: 3 });
const d4 = makeFileElement({ name: 'D4', data: 0, subs: [f1, f2] });
const d5 = makeFileElement({ name: 'D5', data: 0, subs: [f3] });
const d6 = makeFileElement({ name: 'D6', data: 0, subs: [d4, d5] });
