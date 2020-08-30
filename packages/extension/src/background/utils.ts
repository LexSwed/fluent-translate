import { debounce } from 'debounce';
import { nanoid } from 'nanoid';

import { Storage } from '../utils';

export const addMemoryItem = debounce(
  async ({ text, to, from, translation }: Omit<MemoryItem, 'id'>) => {
    if (text.length > 40) {
      return;
    }

    const { memory = [] } = await Storage.getSyncItems<{
      memory: MemoryItems;
    }>('memory');

    const textIndex = memory.findIndex(
      (item) => item.text === text && item.translation === translation
    );
    const item = memory[textIndex];

    if (item) {
      memory.splice(textIndex, 1);
    }

    // to prevent memory capacity error, remove last element first
    memory.slice(0, -1).unshift({
      id: item ? item.id : nanoid(),
      text,
      to,
      from,
      translation,
    });

    await Storage.setSyncItems({ memory: memory.slice(0, 100) });
  },
  3000
);
