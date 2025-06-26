'use client';
import { useState, useRef } from 'react';
import { Button } from './ui/button';
import AnsiToHtml from 'ansi-to-html';
import Confetti from 'react-confetti';

export const Terminal = () => {
  const [buffer, setBuffer] = useState('');
  const [testsQueued, setTestsQueued] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const ansiConvert = new AnsiToHtml();
  const [exitCode, setExitCode] = useState<number | null>(null);

  const handleClick = async () => {
    setTestsQueued(true);
    setBuffer('Test run has been queued... please wait <br/>');

    // Ensure that there is no current Eventsource before begining
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const res = await fetch('/api/add-job', { method: 'POST' });
    const { jobId } = await res.json();

    const events = new EventSource(`/api/test-stream?jobId=${jobId}`);
    eventSourceRef.current = events;
    setExitCode(null);

    events.onmessage = (event) => {
      if (event.data.length > 0) {
        const parsedAnsi = ansiConvert.toHtml(event.data);
        setBuffer((prev) => prev + parsedAnsi + '<br/>');
      }
    };

    events.addEventListener('end', (event) => {
      // Parse exit code as integer if possible
      const code = parseInt(event.data.slice(-2, -1), 10);
      setExitCode(isNaN(code) ? null : code);
      events.close();
      setTestsQueued(false);
    });

    events.onerror = () => {
      events.close();
      setTestsQueued(false);
    };
  };

  return (
    <div className="w-200 mx-auto">
      <Button onClick={handleClick} disabled={testsQueued} className="mx-auto">
        Run tests
      </Button>
      <div
        className="border-2 border-slate-700 w-200 mx-auto h-[20vh] right-0 bg-slate-700/30 rounded-lg"
        aria-readonly
        aria-label="Console output from test run"
        dangerouslySetInnerHTML={{ __html: buffer }}
      />
      {exitCode === 0 && <Confetti numberOfPieces={500} recycle={false} />}
    </div>
  );
};
