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

    if (memory[textIndex]) {
      memory.splice(textIndex, 1);
    }

    const newItem = {
      id: nanoid(),
      text,
      to,
      from,
      translation,
    };
    const newItemByteSize = getSize(newItem);

    while (
      getSize(memory) + newItemByteSize >
      chrome.storage.sync.QUOTA_BYTES_PER_ITEM
    ) {
      memory.pop();
    }

    memory.unshift(newItem);

    await Storage.setSyncItems({
      memory,
    });
  },
  3000
);

function getSize(object: any) {
  return new Blob([JSON.stringify(object)]).size;
}
