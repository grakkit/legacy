import { types } from './types';
import { events } from './events';
import { imports } from './imports';

import {
   jiFile,
   jiInputStream,
   obcCommand,
   obcCommandMap,
   obcCommandSender,
   obpPlugin,
   obpPluginManager,
   ogpContext
} from './classes';

/** The best thing that's ever happened to minecraft, change my mind. */
export interface core {
   /** A stand-in for circular references. */
   circular: () => void;
   /** A utility function used for recursive operations. */
   chain: (base: any, modifier: (object: any, chain: () => {}) => void) => void;
   /** Registers a custom command to the server with the given options. */
   command: (
      options: {
         name: string;
         error?: string;
         aliases?: string[];
         execute?: (player: obcCommandSender, ...args: string[]) => void;
         fallback?: string;
         permission?: string;
         tabComplete?: (player: obcCommandSender, ...args: string[]) => string[];
      }
   ) => void;
   /** The main polyglot context. */
   context: ogpContext;
   /** Returns a persistent data object linked to the given path. */
   data: (...path: string[]) => any;
   /** Formats common server error messages */
   error: (error: string) => string;
   /** Evaluates JS code. */
   eval: (code: string) => any;
   /** Registers event listeners to the server. */
   event: typeof events.event;
   /** Used by modules to export their code. */
   export: (object: any) => void;
   /** Imports a type from the server and extends it. */
   extend: typeof types.type;
   /** Make a GET request to the given URL. */
   fetch: (
      from: string
   ) => {
      /** Attempts to parse the output content as JSON. */
      json: () => any;
      /** Returns the raw output content. */
      read: () => string;
      /** Returns an input stream for this request's URL. */
      stream: () => jiInputStream;
      /** Attempts to parse the output content as a ZIP file and unzip the contents to the given path. */
      unzip: (to: any) => core$file;
   };
   /** Returns an object with various utility methods for operating on the filesystem. */
   file: (...path: string[]) => core$file;
   /** Imports a module, prefixed with `@`, or a file relative to the current origin. */
   import: typeof imports.import;
   /** Initializes the grakkit core. */
   init: () => void;
   /** The server's plugin manager. */
   manager: obpPluginManager;
   module: {
      /** Performs the given `action` on a module and informs the `player` on the results. */
      action: (player: obcCommandSender, option: string, key: string) => void;
      /** Downloads and registers a module's latest release to the server. */
      add: (key: string) => void;
      /** Deletes a module from the server. */
      delete: (key: string) => void;
      /** Generates typescript references for all installed modules. */
      dict: () => void;
      /** Downloads a module's latest release to the server and returns that release's tag name. */
      download: (key: string) => string;
      /** Returns the info on the latest release of a module. */
      latest: (
         key: string
      ) => {
         name: string;
         zipball_url: string;
         tarball_url: string;
         commit: {
            sha: string;
            url: string;
         };
         node_id: string;
      };
      /** Stores all installed modules and their verions. */
      list: { [x: string]: string };
      /** Deletes and unregisters a module from the server. */
      remove: (key: string) => void;
      /** Updates a module if the latest release is not already installed. */
      update: (key: string) => void;
   };
   /** Formats the given object into a pretty-printed string. */
   output: (object: any, nested?: boolean) => string;
   /** The grakkit plugin instance. */
   plugin: obpPlugin;
   /** Unregisters all event listeners, cancels all tasks, unreferences all global objects, and re-initializes the grakkit core. */
   refresh: (disable?: boolean) => void;
   /** The command map used to register custom commands. */
   registry: obcCommandMap;
   /** A file wrapper for this plugin's root folder. */
   root: core$file;
   /** Removes circular references from an object recursively, replacing them with circular markers or `null` if `nullify` is true. */
   serialize: (object: any, nullify: boolean, ...nodes: any[]) => any;
   /** Stores anything pertaining to the currently active session. */
   session: {
      /** Stores all registered commands. */
      command: {
         [x: string]: {
            /** The executor for a given command. */
            execute: (player: obcCommandSender, ...args: string[]) => void;
            /** The tab-completer for a given command. */
            tabComplete: (player: obcCommandSender, ...args: string[]) => string[];
            /** The server instance of a given command. */
            instance: obcCommand;
         };
      };
      /** Stores all persistent data objects. */
      data: any;
      /** Stores all registered event listeners. */
      event: { [x: string]: ((event: any) => void)[] };
      /** Stores all file and module export functions. */
      export: { file: ((value: any) => void)[]; module: ((value: any) => void)[] };
      /** References the current execution context. */
      origin: core$file;
      /** Stores imported types as a cache. */
      types: { [x: string]: any };
   };
   /** Sends a message to the given player in chat or in the action bar. */
   send: (player: obcCommandSender, message: string, action: boolean) => void;
   /** A module-scoped state bag acting as dedicated global storage. */
   storage: any;
   /** A set of toggles used to control behavior in the initialization phase. */
   toggles: {
      /** Toggle for dictionary file downloads. */
      dict: boolean;
      /** Toggle for scripts folder evaluation. */
      scripts: boolean;
      /** Toggle for trusted module list fetching. */
      trusted: boolean;
      /** Toggle for user file creation. */
      user: boolean;
   };
   /** Imports a type from the server. */
   type: typeof types.type;
   /** Attempts to parse the input stream as a ZIP file and unzips the contents to the given path. */
   unzip: (from: jiInputStream, to: jiFile) => core$file;
   /** A version identifier used for compatibility. */
   version: 'modern' | 'legacy' | 'ancient';
}

type core$file = {
   /** Makes a file at the current path if one does not exist. */
   add: () => core$file;
   /** If the current path is a folder, returns an array of its contents. */
   children: core$file[];
   /** Makes a folder at the current path if one does not exist. */
   dir: () => core$file;
   /** If the current path is a folder, executes all scripts within it. */
   execute: () => core$file;
   /** Whether a file or folder at the current path exists or not. */
   exists: boolean;
   /** Joins the current path and the given sub-path and creates a new file object with that path. */
   file: (...sub: string[]) => core$file;
   /** Recursively removes parent folders, starting from the current file's parent folder, moving upstream until a parent folder is non-empty. */
   flush: () => core$file;
   /** The internal file interface for the current path. */
   io: jiFile;
   /** Attempts to parse the current path as a JSON file. */
   json: () => any;
   /** The name of the file or folder at the current path. */
   name: string;
   /** Attempts to parse the current path as a JS file. */
   parse: () => core$file;
   /** The current path in string form. */
   path: string;
   /** If the current path is a file, returns the raw output content of that file. */
   read: () => string;
   /** Removes the file or folder at the current path, and flushes its parent folders. */
   remove: () => core$file;
   /** Returns an output stream for the file at the current path. */
   stream: () => any;
   /** Moves or copies the file or folder at the current path to another path, and flushes the current path's parent folders. */
   transfer: (to: jiFile, action: 'move' | 'copy') => core$file;
   /** If the current path is a file, writes the given content to that file. */
   write: (content: string) => core$file;
   /** Attempts to parse the current path as a ZIP file and unzip the contents to the given path. */
   unzip: (to: jiFile) => void;
};
