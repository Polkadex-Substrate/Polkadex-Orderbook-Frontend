import { ItemBase, SectionBase } from "./base";
import { Button } from "./button";
import Dropdown from "./dropdown";
import { Menu } from "./menu";
import { Trigger } from "./trigger";

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = ItemBase;
Dropdown.Button = Button;
Dropdown.Section = SectionBase;

export { Dropdown };
