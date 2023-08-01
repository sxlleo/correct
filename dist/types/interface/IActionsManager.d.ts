import type { IAction } from './IAction';
interface IActionsManager {
    get curTool(): IAction;
    destroy(): void;
    set curActionType(value: any);
    get curActionType(): number;
}
export type { IActionsManager };
