import { useEffect, useMemo, useRef, useState } from 'react';
import type { Lesson, LessonNode } from '@/lib/curriculum';

type LessonPlayerProps = {
  trackTitle: string;
  courseTitle: string;
  moduleTitle: string;
  lesson: Lesson;
  lessonId: string;
  courseHref: string;
  currentHref: string;
  moduleLessons: LessonNode[];
  previousLesson: LessonNode | null;
  nextLesson: LessonNode | null;
};

const STORAGE_KEY = 'heka-it-progress-v1';

type ProgressState = {
  completedLessonIds: string[];
};

function readProgress(): ProgressState {
  if (typeof window === 'undefined') {
    return { completedLessonIds: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { completedLessonIds: [] };
    }

    const parsed = JSON.parse(raw) as ProgressState;
    if (!Array.isArray(parsed.completedLessonIds)) {
      return { completedLessonIds: [] };
    }

    return parsed;
  } catch {
    return { completedLessonIds: [] };
  }
}

function writeProgress(state: ProgressState) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function LessonPlayer({
  trackTitle,
  courseTitle,
  moduleTitle,
  lesson,
  lessonId,
  courseHref,
  currentHref,
  moduleLessons,
  previousLesson,
  nextLesson,
}: LessonPlayerProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const lessonContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const progress = readProgress();
    setCompletedIds(new Set(progress.completedLessonIds));
  }, []);

  useEffect(() => {
    const renderInteractiveBlocks = async () => {
      const contentElement = lessonContentRef.current;
      if (!contentElement) {
        return;
      }

      const isDark = document.documentElement.classList.contains('dark');
      const mermaidBlocks = contentElement.querySelectorAll('pre > code.language-mermaid');
      if (mermaidBlocks.length > 0) {
        mermaidBlocks.forEach((codeBlock) => {
          const source = codeBlock.textContent?.trim();
          const pre = codeBlock.closest('pre');
          if (!source || !pre) {
            return;
          }

          const container = document.createElement('div');
          container.className = 'mermaid';
          container.textContent = source;
          pre.replaceWith(container);
        });

        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: isDark
            ? {
                background: '#0b1418',
                primaryColor: '#16323a',
                primaryBorderColor: '#59d3e3',
                primaryTextColor: '#f5feff',
                secondaryColor: '#13252b',
                tertiaryColor: '#102027',
                lineColor: '#8ee6f2',
                textColor: '#f5feff',
                mainBkg: '#16323a',
                secondBkg: '#13252b',
                tertiaryBkg: '#102027',
                clusterBkg: '#13252b',
                clusterBorder: '#59d3e3',
                nodeBorder: '#59d3e3',
                edgeLabelBackground: '#0b1418',
              }
            : {
                background: '#ffffff',
                primaryColor: '#e8f7f7',
                primaryBorderColor: '#14808c',
                primaryTextColor: '#14343a',
                secondaryColor: '#dff2f1',
                tertiaryColor: '#f4fbfb',
                lineColor: '#14808c',
                textColor: '#14343a',
                mainBkg: '#e8f7f7',
                secondBkg: '#dff2f1',
                tertiaryBkg: '#f4fbfb',
                clusterBkg: '#f4fbfb',
                clusterBorder: '#14808c',
                nodeBorder: '#14808c',
                edgeLabelBackground: '#ffffff',
              },
        });

        await mermaid.run({
          querySelector: '.markdown-content .mermaid',
        });
      }
    };

    void renderInteractiveBlocks();
  }, [lessonId, lesson.contentHtml]);

  const currentIndex = useMemo(
    () => moduleLessons.findIndex((node) => node.id === lessonId),
    [moduleLessons, lessonId]
  );

  const completedCount = useMemo(
    () => moduleLessons.filter((node) => completedIds.has(node.id)).length,
    [moduleLessons, completedIds]
  );
  const progressPercent = moduleLessons.length > 0
    ? Math.round((completedCount / moduleLessons.length) * 100)
    : 0;
  const isCurrentCompleted = completedIds.has(lessonId);
  const canOpenNext = !nextLesson || isCurrentCompleted;

  const toggleCurrentLesson = () => {
    const nextSet = new Set(completedIds);
    if (nextSet.has(lessonId)) {
      nextSet.delete(lessonId);
    } else {
      nextSet.add(lessonId);
    }

    setCompletedIds(nextSet);
    writeProgress({ completedLessonIds: Array.from(nextSet) });
  };

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <aside className="order-2 h-fit rounded-2xl border bg-card p-4 lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{courseTitle}</p>
          <h2 className="mt-1 text-lg font-semibold">{moduleTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Progreso del módulo</p>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>{completedCount} / {moduleLessons.length} lecciones</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <a href={courseHref} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Ver todos los módulos
          </a>

          <div className="mt-5 space-y-2">
            {moduleLessons.map((node, index) => {
              const previousNode = index > 0 ? moduleLessons[index - 1] : null;
              const unlocked = index === 0 || Boolean(previousNode && completedIds.has(previousNode.id)) || node.id === lessonId;
              const isCurrent = node.id === lessonId;
              const isDone = completedIds.has(node.id);

              return unlocked ? (
                <a
                  key={node.id}
                  href={node.href}
                  className={`block rounded-lg border px-3 py-2 text-sm transition ${
                    isCurrent
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border hover:border-primary/40 hover:bg-accent'
                  }`}
                >
                  <p className="text-xs text-muted-foreground">{node.moduleTitle}</p>
                  <p className="font-medium">{node.title}</p>
                  {isDone && <p className="text-xs text-primary">Completada</p>}
                </a>
              ) : (
                <div key={node.id} className="rounded-lg border border-dashed px-3 py-2 text-sm opacity-60">
                  <p className="text-xs text-muted-foreground">{node.moduleTitle}</p>
                  <p className="font-medium">{node.title}</p>
                  <p className="text-xs text-muted-foreground">Bloqueada hasta completar la anterior</p>
                </div>
              );
            })}
          </div>
        </aside>

        <article className="order-1 rounded-2xl border bg-card p-6 md:p-8">
          <p className="text-sm text-muted-foreground">{moduleTitle}</p>
          <h1 className="mt-1 text-3xl font-bold">{lesson.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Lección {currentIndex + 1} de {moduleLessons.length}
          </p>
          <p className="mt-3 text-base text-muted-foreground">{lesson.summary}</p>

          <section className="mt-8 space-y-3">
            <div
              ref={lessonContentRef}
              className="markdown-content space-y-3 leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
            />
          </section>

          <section className="mt-10 flex flex-wrap items-center gap-3 border-t pt-6">
            <button
              type="button"
              onClick={toggleCurrentLesson}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isCurrentCompleted
                  ? 'bg-amber-600 text-black hover:bg-amber-500'
                  : 'bg-primary text-black hover:opacity-90'
              }`}
            >
              {isCurrentCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
            </button>

            {previousLesson ? (
              <a href={previousLesson.href} className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent">
                Anterior
              </a>
            ) : (
              <a href={courseHref} className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent">
                Volver al curso
              </a>
            )}

            {nextLesson ? (
              canOpenNext ? (
                <a href={nextLesson.href} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background">
                  Siguiente
                </a>
              ) : (
                <span className="rounded-lg border border-dashed px-4 py-2 text-sm text-muted-foreground">
                  Completa esta lección para desbloquear la siguiente
                </span>
              )
            ) : (
              <a href={currentHref} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background">
                Repetir lección
              </a>
            )}
          </section>
        </article>
      </div>
    </section>
  );
}
