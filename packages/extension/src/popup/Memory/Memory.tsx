import {
  css,
  CssStyles,
  Dialog,
  Flex,
  Icon,
  IconButton,
  styled,
  useDialogRef,
} from '@fxtrot/ui';

import { MemoryEntry } from './MemoryEntry';
import { useMemoryItems, useSavedItem } from '../atoms';
import { BookmarkAltIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useRef } from 'react';

export const Memory = () => {
  const [items] = useMemoryItems();
  const dialogRef = useDialogRef();

  useEffect(() => {
    if (items.length === 0) {
      dialogRef.current?.close();
    }
  }, [items.length, dialogRef]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Dialog ref={dialogRef}>
      <IconButton
        label="History of translations"
        variant="flat"
        size="sm"
        cross="center"
      >
        <Icon as={BookmarkAltIcon} />
      </IconButton>
      {(close) => <MemoryList closeDialog={close} />}
    </Dialog>
  );
};

const MemoryList = ({ closeDialog }: { closeDialog: () => void }) => {
  const [items, onDelete] = useMemoryItems();
  const update = useSavedItem();

  const ref = useBodySizeHack();

  const onSelect = useCallback(
    (item: MemoryItem) => {
      update(item);
      closeDialog();
    },
    [closeDialog, update]
  );

  return (
    <Dialog.Modal css={modalStyle} hasCloseButton={false} ref={ref}>
      <ScrollSnapStart>
        <Flex flow="row" main="end">
          <Dialog.Close size="sm" />
        </Flex>
      </ScrollSnapStart>
      <Flex role="list" flow="column" cross="stretch" css={listStyle}>
        {items.map((item) => (
          <MemoryEntry
            key={item.id}
            item={item}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </Flex>
    </Dialog.Modal>
  );
};

const ScrollSnapStart = styled('span', {
  display: 'block',
  scrollSnapAlign: 'start',
  px: '$3',
  py: '$2',
});

const listStyle: CssStyles = {
  p: 0,
  listStyle: 'none',
  m: 0,
};

const modalStyle: CssStyles = {
  width: '100vw',
  height: '100%',
  maxWidth: 'none',
  overflow: 'auto',
  scrollSnapType: 'y',
  br: '$0',
  p: 0,
  overlay: {
    overflow: 'hidden',
    height: '100vh',
  },
};

/**
 * We need body to expand even if the modal is absolutely positioned
 */
function useBodySizeHack() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) {
      return;
    }
    const style = css({
      height: elRef.current.scrollHeight,
    }).toString();
    document.body.classList.add(style);
    return () => {
      document.body.classList.remove(style);
    };
  });

  return elRef;
}
