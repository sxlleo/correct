declare class SnapshotManager {
    _undoStack: any[];
    constructor();
    add(snapshot: () => void): void;
    pop(): () => void;
    clean(): void;
    destroy(): void;
    get undoStack(): any[];
}
export default SnapshotManager;
