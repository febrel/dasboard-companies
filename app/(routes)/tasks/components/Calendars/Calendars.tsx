"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventContentArg } from "@fullcalendar/core/index.js";

import axios from "axios";

import { formatDate } from "@/lib/formatDate";

import { CalendarProps } from "./Calendars.types";
import ModalAddEvent from "../ModalAddEvent/ModalAddEvent";

export default function Calendars(props: CalendarProps) {
  const { companies, events } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DateSelectArg>();

  useEffect(() => {
    if (onSaveNewEvent) {
      router.refresh();
      setOnSaveNewEvent(false);
    }
  }, [onSaveNewEvent, router]);

  const handleDateClick = async (selected: DateSelectArg) => {
    setOpen(true);
    setSelectedItem(selected);
  };

  const handleEventClick = async (eventId: string, eventTitle: string) => {
    const confirmed = window.confirm(`Delete task "${eventTitle}"?`);
    if (!confirmed) return;

    try {
      await axios.delete(`/api/events/${eventId}`);
      router.refresh();
    } catch {
      console.log("Error deleting event");
    }
  };

  return (
    <div>
      <div className="md:flex gap-x-3">
        <div className="w-[200px] relative">
          <div className="absolute left-0 top-0 h-full w-full overflow-auto">
            <p className="mb-3 text-xl">Task List</p>
            {events.map((currentEvent) => (
              <div
                key={currentEvent.id}
                className="p-4 rounded-lg shadow-md mb-2 bg-blue-100 dark:bg-black dark:text-white"
              >
                <p className="font-bold">{currentEvent.title}</p>
                <p>{formatDate(currentEvent.start)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 calendar-container">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              multiMonthPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right:
                "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth",
            }}
            height="80vh"
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            eventContent={renderEventContent}
            editable={true}
            selectable={true}
            selectMirror={true}
            select={handleDateClick}
                eventClick={(arg) =>
                  handleEventClick(arg.event.id, arg.event.title)
                }
          />
        </div>
      </div>
      <ModalAddEvent
        open={open}
        setOpen={setOpen}
        setOnSaveNewEvent={setOnSaveNewEvent}
        companies={companies}
        selectedDate={selectedItem?.start ?? new Date()}
      />
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className="w-full p-1 rounded bg-blue-100 text-blue-900 dark:bg-black dark:text-white text-xs font-medium cursor-pointer">
      {eventInfo.event.title}
    </div>
  );
}
