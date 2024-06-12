import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@orderbook/core/constants";
import { useMemo, useState } from "react";
import { Document } from "@contentful/rich-text-types";
import { th } from "date-fns/locale";

import { client, getAnnouncements } from "../lib/contentfull/api";
export const DEFAULTANNOUNCEMENTSNAME = "localannouncements";

export interface Announcement {
  id: string;
  date: string;
  type: "Error" | "Information" | "Success" | "Loading" | "Attention";
  message: string;
  description?: string;
  category: "Announcements";
  href?: string;
  custom: Document;
}
const setAnnouncements = (notifications: string[]) =>
  localStorage.setItem(DEFAULTANNOUNCEMENTSNAME, JSON.stringify(notifications));
const readedAnnouncements: string[] =
  JSON.parse(localStorage.getItem(DEFAULTANNOUNCEMENTSNAME) as string) || [];

export const useAnnouncements = () => {
  const [read, setRead] = useState(readedAnnouncements);
  const data = useQuery({
    queryKey: [QUERY_KEYS.getAnnouncements],
    queryFn: async () => {
      const result: any = await client.request(getAnnouncements, {
        first: 20,
      });
      console.log(result);
      return result?.annoucementsCollection?.items[0].cardsCollection.items.map(
        (e: any) => ({
          category: "Announcements",
          date: e.sys.publishedAt,
          message: e.title,
          custom: e.description.json,
          id: e.sys.id,
          type: "Information",
        })
      ) as Announcement[];
    },
  });

  const onHandleMarkAsRead = (id: string) => {
    const localStorageData = localStorage.getItem(DEFAULTANNOUNCEMENTSNAME);
    let announcements: string[] = [];

    if (localStorageData) announcements = JSON.parse(localStorageData);

    const updatedAnnouncements = announcements.includes(id)
      ? announcements.filter((item) => item !== id)
      : [...announcements, id];

    setAnnouncements(updatedAnnouncements);
    setRead(updatedAnnouncements);
  };

  return {
    ...data,
    readedAnnouncements: read,
    onHandleMarkAsRead,
  };
};
