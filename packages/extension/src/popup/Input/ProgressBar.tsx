import { styled } from '@fxtrot/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslationStatus } from '../atoms';

export const ProgressBar = () => {
  const status = useTranslationStatus();
  return (
    <AnimatePresence>
      {status === 'fetching' && (
        <FetchingBar
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.9, transition: { duration: 1.5 } }}
          exit={{ scaleX: 1, scaleY: 0, transition: { exit: { duration: 1 } } }}
        />
      )}
    </AnimatePresence>
  );
};

const FetchingBar = styled(motion.span, {
  display: 'block',
  height: 4,
  width: '100%',
  bc: '$accent',
  transformOrigin: 'left center',
});
