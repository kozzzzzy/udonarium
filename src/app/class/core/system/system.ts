import { EventSystem as a } from './event/event-system';
import { Event as b } from './event/event';
import { Listener as c } from './event/listener';
import { Network as d } from './network/network';
import { ConnectionStore as e } from './network/connection-store';

//export import EventSystem = JellyCircuit.EventSystem;
export const EventSystem = a.instance;
export const Event = b;
export const Listener = c;
export const Network = d.instance;