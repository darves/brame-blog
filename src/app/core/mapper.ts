import { classes } from "@automapper/classes";
import { createMapper } from "@automapper/core";
import type { Converter } from '@automapper/types';

export const mapper = createMapper({
  name: 'mapper',
  pluginInitializer: classes,
});



export const stringToDateTimeConverter: Converter<string, Date | undefined> = {
  convert(source) {
    if (source) {
      return new Date(Date.parse(source))
    }

    return undefined;
  },
};
