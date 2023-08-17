import { AnyAction } from "redux";
 
// match actions directly to the types
type Matchable <AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type']; // get the return type of the action
    match(action : AnyAction): action is ReturnType<AC>;
};

// define withMatch function for overloading actions
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCraetor:AC) : Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCraetor:AC) : Matchable<AC>;

export function withMatcher (actionCreator: Function) {
    const type = actionCreator().type; // get the type of the action for every action 

    return Object.assign( actionCreator, {
        type,
        match (action: AnyAction) {
            return action.type === type;
        }
    });
};

export type ActionWithPayload <T,P> = {
    type: T;
    payload: P;
};

export type Action <T> = {
    type: T;
};

// function overloading 
export function createAction <T extends string, P>(
    type: T, 
    payload: P
): ActionWithPayload<T,P>;

export function createAction <T extends string>(
    type: T,
    payload: void
): Action<T>;

export function createAction <T extends string, P>(type: T, payload: P) {
    return { type, payload };
};
