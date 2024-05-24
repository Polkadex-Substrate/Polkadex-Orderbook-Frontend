import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@orderbook/core/constants";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import { client, getAnnouncements } from "../lib/contentfull/api";
import { IAnnouncementComponentFields } from "../lib/contentfull/contentful";
import {
  DEFAULTANNOUNCEMENTSNAME,
  Notification,
} from "../providers/public/settings";
interface Announcement extends IAnnouncementComponentFields {
  sys: {
    publishedAt: string;
    id: string;
  };
}

export const useAnnouncements = () =>
  useQuery({
    queryKey: [QUERY_KEYS.getAnnouncements],
    queryFn: async () => {
      const result: any = await client.request(getAnnouncements, {
        first: 20,
      });
      const local: string[] =
        JSON.parse(localStorage.getItem(DEFAULTANNOUNCEMENTSNAME) as string) ||
        [];
      return result?.annoucementsCollection?.items[0].cardsCollection.items.map(
        (e: Announcement) => {
          const active = !local.includes(e.sys.id);
          const description = documentToPlainTextString(e.description);

          console.log("DES", description);
          console.log("e.description", e.description);

          return {
            category: "Announcements",
            date: e.sys.publishedAt,
            message: e.title,
            description,
            id: e.sys.id,
            type: "Information",
            active,
          } as Notification<string>;
        }
      );
    },
  });
