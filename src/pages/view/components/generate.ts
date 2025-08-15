import { DividerWithTileProps } from "@/components/divider";
import { FormItemProps } from "@/components/form-item";
import { ViewItemProps } from "@/components/view-item";

export function generate<T>(
    data: T,
    config: (FormItemProps | DividerWithTileProps)[],
): (ViewItemProps | DividerWithTileProps)[] {
    const viewItems = config.map((item) =>
        "translateKey" in item
            ? {
                  ...item,
              }
            : {
                  ...item,
                  value: data[item.objectKey as keyof T] as string | number,
              },
    );

    return viewItems;
}
