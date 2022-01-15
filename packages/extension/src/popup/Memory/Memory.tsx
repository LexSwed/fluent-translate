import {
  Column,
  css,
  CssStyles,
  Dialog,
  Icon,
  IconButton,
  Row,
  styled,
  useDialogRef,
} from '@fxtrot/ui';

import { MemoryEntry } from './MemoryEntry';
import { useMemoryItems, useSavedItem } from '../atoms';
import { BookmarkAltIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useRef } from 'react';
import { useLocale } from '../../translations';

export const Memory = () => {
  const [items] = useMemoryItems();
  const dialogRef = useDialogRef();
  const t = useLocale();

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
        label={t('popup.memory.open-label')}
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
        <Row flow="row" main="end">
          <Dialog.Close size="sm" />
        </Row>
      </ScrollSnapStart>
      <Column role="list" cross="stretch" css={listStyle}>
        {items.map((item) => (
          <MemoryEntry
            key={item.id}
            item={item}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </Column>
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
    const el = document.getElementById('edge-translate');
    if (!el) {
      return;
    }
    const style = css({
      overflow: 'hidden',
      maxHeight: 600,
      height: elRef.current.scrollHeight,
    }).toString();
    el.classList.add(style);
    return () => {
      el.classList.remove(style);
    };
  });

  return elRef;
}
