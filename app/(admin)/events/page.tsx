"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type EventCategory = "Meeting" | "Workshop" | "Holiday" | "Reminder";

const CATEGORY_STYLES: Record<EventCategory, string> = {
  Meeting: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  Workshop: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
  Holiday: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Reminder: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300",
};

type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  time?: string;
  category: EventCategory;
  description?: string;
};

type EventFormState = {
  title: string;
  date: string;
  time: string;
  category: EventCategory;
  description: string;
};

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function createEmptyFormState(): EventFormState {
  return {
    title: "",
    date: getTodayISODate(),
    time: "",
    category: "Meeting",
    description: "",
  };
}

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "event-conf",
    title: "Quarterly Review",
    date: getTodayISODate(),
    time: "11:00",
    category: "Meeting",
    description: "Discuss KPIs and roadmap with leadership.",
  },
  {
    id: "workshop",
    title: "Design Systems Workshop",
    date: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().slice(0, 10),
    time: "15:00",
    category: "Workshop",
    description: "Hands-on session for product design team.",
  },
  {
    id: "holiday",
    title: "Founder's Day",
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().slice(0, 10),
    category: "Holiday",
    description: "Company-wide office holiday.",
  },
];

export default function EventsPage() {
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()));
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [formState, setFormState] = useState<EventFormState>(createEmptyFormState);

  const mappedEvents = useMemo(() => {
    return events.reduce<Record<string, CalendarEvent[]>>((accumulator, event) => {
      const list = accumulator[event.date] ?? [];
      list.push(event);
      list.sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
      accumulator[event.date] = list;
      return accumulator;
    }, {});
  }, [events]);

  const calendarDays = useMemo(() => buildCalendarDays(currentMonth), [currentMonth]);

  const monthLabel = useMemo(
    () =>
      currentMonth.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      }),
    [currentMonth],
  );

  const upcomingEvents = useMemo(() => {
    return [...events]
      .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? ""))
      .filter((event) => event.date >= startOfMonth(new Date()).toISOString().slice(0, 10));
  }, [events]);

  const handleMonthChange = (offset: number) => {
    setCurrentMonth((month) => {
      const next = new Date(month);
      next.setMonth(month.getMonth() + offset);
      return startOfMonth(next);
    });
  };

  const openModal = () => {
    setActiveEventId(null);
    setFormState(createEmptyFormState());
    setModalOpen(true);
  };

  const openEditModal = (calendarEvent: CalendarEvent) => {
    setActiveEventId(calendarEvent.id);
    setFormState({
      title: calendarEvent.title,
      date: calendarEvent.date,
      time: calendarEvent.time ?? "",
      category: calendarEvent.category,
      description: calendarEvent.description ?? "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = formState.title.trim();
    if (!trimmedTitle) {
      alert("Event title is required.");
      return;
    }

    if (!formState.date) {
      alert("Select a date for the event.");
      return;
    }

    if (activeEventId) {
      setEvents((current) =>
        current.map((existing) =>
          existing.id === activeEventId
            ? {
                ...existing,
                title: trimmedTitle,
                date: formState.date,
                time: formState.time || undefined,
                category: formState.category,
                description: formState.description.trim() || undefined,
              }
            : existing,
        ),
      );
    } else {
      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        date: formState.date,
        time: formState.time || undefined,
        category: formState.category,
        description: formState.description.trim() || undefined,
      };

      setEvents((current) => [...current, newEvent]);
    }

    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!activeEventId) return;
    setEvents((current) => current.filter((eventItem) => eventItem.id !== activeEventId));
    setModalOpen(false);
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Events & Calendar</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Plan upcoming company events, workshops, and reminders at a glance.
          </p>
        </div>
        <Button type="button" onClick={openModal}>
          Add Event
        </Button>
      </header>

      <section className="grid gap-6 lg:grid-cols-[3fr_1.2fr]">
        <Card className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleMonthChange(-1)}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Previous month"
              >
                ◀
              </button>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">{monthLabel}</div>
              <button
                type="button"
                onClick={() => handleMonthChange(1)}
                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Next month"
              >
                ▶
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => setCurrentMonth(startOfMonth(new Date()))}
                className="rounded-md border border-blue-200 px-3 py-2 font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-300 dark:hover:bg-blue-500/10"
              >
                Today
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {WEEKDAY_LABELS.map((weekday) => (
              <div key={weekday} className="px-2 pb-2">
                {weekday}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-sm">
            {calendarDays.map(({ date, isCurrentMonth, key }) => {
              const dayKey = date.toISOString().slice(0, 10);
              const eventsForDay = mappedEvents[dayKey] ?? [];
              const isToday = isSameDay(date, new Date());

              return (
                <div
                  key={key}
                  className={`flex min-h-[120px] flex-col rounded-xl border p-3 transition hover:border-blue-400 hover:bg-blue-50/40 dark:hover:border-blue-500/60 dark:hover:bg-blue-500/10 ${
                    isCurrentMonth
                      ? "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
                      : "border-gray-100 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-600"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between text-xs font-semibold ${
                      isToday ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <span>{date.getDate()}</span>
                    {isToday ? <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">Today</span> : null}
                  </div>
                  <div className="mt-2 space-y-2">
                    {eventsForDay.length > 0 ? (
                      eventsForDay.slice(0, 3).map((calendarEvent) => (
                        <div
                          key={calendarEvent.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => openEditModal(calendarEvent)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              openEditModal(calendarEvent);
                            }
                          }}
                          className={`w-full rounded-md px-2 py-1 text-xs font-medium ${CATEGORY_STYLES[calendarEvent.category]}`}
                          title={[calendarEvent.title, calendarEvent.time, calendarEvent.description]
                            .filter(Boolean)
                            .join(" • ")}
                        >
                          <div className="truncate">{calendarEvent.title}</div>
                          {calendarEvent.time ? <div className="text-[10px] uppercase">{calendarEvent.time}</div> : null}
                        </div>
                      ))
                    ) : (
                      <div className="text-[11px] text-gray-400 dark:text-gray-600">No events</div>
                    )}
                    {eventsForDay.length > 3 ? (
                      <div className="text-[11px] font-medium text-blue-600 dark:text-blue-300">
                        +{eventsForDay.length - 3} more
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <aside className="space-y-4">
          <Card title="Upcoming Events" description="Sorted chronologically" className="space-y-0">
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-3">
                {upcomingEvents.map((calendarEvent) => (
                  <li
                    key={calendarEvent.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openEditModal(calendarEvent)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openEditModal(calendarEvent);
                      }
                    }}
                    className="cursor-pointer rounded-lg border border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/40 focus-within:border-blue-400 dark:border-gray-700 dark:hover:border-blue-500/60 dark:hover:bg-blue-500/10"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      <span>{formatDisplayDate(calendarEvent.date)}</span>
                      {calendarEvent.time ? <span>{calendarEvent.time}</span> : null}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {calendarEvent.title}
                    </div>
                    <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${CATEGORY_STYLES[calendarEvent.category]}`}>
                      {calendarEvent.category}
                    </span>
                    {calendarEvent.description ? (
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{calendarEvent.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No scheduled events for this period.</p>
            )}
          </Card>
        </aside>
      </section>

      <Modal
        title={activeEventId ? "Edit Event" : "Add Event"}
        description={activeEventId ? "Update details or remove the event from your company calendar." : "Fill in the fields to schedule a new event for your team."}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Event Title"
            value={formState.title}
            onChange={(event) => setFormState((state) => ({ ...state, title: event.target.value }))}
            placeholder="e.g. Product Launch"
            required
          />
          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Date</span>
            <input
              type="date"
              value={formState.date}
              onChange={(event) => setFormState((state) => ({ ...state, date: event.target.value }))}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </label>
          <Input
            label="Time (optional)"
            type="time"
            value={formState.time}
            onChange={(event) => setFormState((state) => ({ ...state, time: event.target.value }))}
          />
          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Category</span>
            <select
              value={formState.category}
              onChange={(event) => setFormState((state) => ({ ...state, category: event.target.value as EventCategory }))}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            >
              {(Object.keys(CATEGORY_STYLES) as EventCategory[]).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-700 dark:text-gray-200">Description</span>
            <textarea
              rows={3}
              value={formState.description}
              onChange={(event) => setFormState((state) => ({ ...state, description: event.target.value }))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm transition placeholder-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:ring-blue-500"
              placeholder="Add more context for attendees"
            />
          </label>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
            {activeEventId ? (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 dark:border-red-500/50 dark:text-red-300 dark:hover:bg-red-500/10"
              >
                Delete
              </button>
            ) : null}
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <Button type="submit" className="rounded-full px-5">
              {activeEventId ? "Save Changes" : "Save Event"}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

function buildCalendarDays(month: Date) {
  const start = startOfMonth(month);
  const firstDayOffset = start.getDay();
  const calendarStart = new Date(start);
  calendarStart.setDate(calendarStart.getDate() - firstDayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    return {
      key: date.toISOString(),
      date,
      isCurrentMonth: date.getMonth() === month.getMonth(),
    };
  });
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDisplayDate(isoDate: string) {
  const parsed = new Date(isoDate);
  return parsed.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
