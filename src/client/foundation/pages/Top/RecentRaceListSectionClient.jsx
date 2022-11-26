"use client";

import { Heading } from "../../components/typographies/Heading";
import { isSameDay } from "../../utils/DateUtils";
import { RecentRaceList } from "./internal/RecentRaceList/RecentRaceList";
import { RecentRaceListItem } from "./internal/RecentRaceList/RecentRaceListItem";

export function RecentRaceListSectionClient({ races, data: _date }) {
  const date = _date ? new Date(_date) : new Date();
  const todayRaces = races.filter((race) => isSameDay(race.startAt, date));

  return (
    <section>
      <Heading as="h1">本日のレース</Heading>
      {todayRaces.length > 0 && (
        <RecentRaceList>
          {todayRaces.map((race, index) => (
            <RecentRaceListItem key={race.id} race={race} index={index} />
          ))}
        </RecentRaceList>
      )}
    </section>
  );
}
