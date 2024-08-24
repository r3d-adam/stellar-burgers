import { RootState } from "../store";
import { Action, ActionCreatorWithPayload, ActionCreatorWithoutPayload, AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Middleware } from '@reduxjs/toolkit'
import { PayloadAction } from "@reduxjs/toolkit";
import { refreshToken } from "../../utils/api";




export type TwsActions = {
	  wsInit: ActionCreatorWithPayload<string | null>;
    wsClose: ActionCreatorWithoutPayload;
    wsSendMessage?: ActionCreatorWithPayload<any>;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
};





export const socketMiddleware = (
  wsActions: TwsActions,
  withTokenRefresh: boolean = false 
):  Middleware<{}, RootState> => (store) => {
    let socket: WebSocket | null = null;
    let url: string | null = null; 
    let closing: boolean = false;
    const {
      wsInit,
      wsClose,
      wsSendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;

    return (next => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (wsInit.match(action)) {
        socket = new WebSocket(payload);
        url = payload;
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type));
        };

        socket.onmessage = (event) => {
          console.log(event);
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
            refreshToken().then((refreshData) => {
              const wssUrl = new URL(url!);
              wssUrl.searchParams.set(
                "token",
                refreshData.accessToken.replace("Bearer ", "")
              );
              dispatch(wsInit(wssUrl.toString()));
            });
          } else {
             dispatch(onMessage(parsedData));
          }
        };

        socket.onclose = (event) => {
          console.log('closing', closing);
          
          if (closing) {
            dispatch(onClose());
          } else {
            dispatch(wsInit(url));
          }
        };
      }


      if (wsClose && wsClose.match(action) && socket) {
        closing = true;
        socket.close();
      }

      if (wsSendMessage && wsSendMessage.match(action) && socket) {
        socket.send(JSON.stringify(payload));
      }

      next(action);
    });
  };

