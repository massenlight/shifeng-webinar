import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { mountCheckup } from './threads/quiz.js';
import styles from './threads/quiz.css?inline';

export interface ThreadsCheckupHandle { open: () => void }

// A shadow root isolates the existing quiz design from the course's Tailwind styles.
export const ThreadsCheckup = forwardRef<ThreadsCheckupHandle, { onOpenRegister: () => void }>(function ThreadsCheckup({ onOpenRegister }, ref) {
  const registerCallback = useRef(onOpenRegister);
  registerCallback.current = onOpenRegister;
  const host = useRef<HTMLDivElement>(null);
  const quiz = useRef<ReturnType<typeof mountCheckup> | null>(null);
  useImperativeHandle(ref, () => ({ open: () => quiz.current?.open() }), []);
  useEffect(() => {
    if (!host.current) return;
    const root = host.current.shadowRoot || host.current.attachShadow({ mode: 'open' });
    const sheet = document.createElement('style');
    sheet.textContent = styles;
    const content = document.createElement('div');
    content.id = 'app';
    root.replaceChildren(sheet, content);
    quiz.current = mountCheckup(root, () => registerCallback.current());
    return () => { quiz.current?.destroy(); quiz.current = null; };
  }, []);
  return <div ref={host} id="threads-checkup" role="region" aria-label="Threads 人格測驗" />;
});
