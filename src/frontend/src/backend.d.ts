import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TechnologyJourney {
    milestones: Array<Milestone>;
}
export interface Milestone {
    id: bigint;
    status: Value;
    title: string;
    isCompleted: boolean;
    illustrationUrl: string;
    description: string;
}
export enum Value {
    completed = "completed",
    locked = "locked",
    unlocked = "unlocked"
}
export interface backendInterface {
    getUserJourney(): Promise<TechnologyJourney>;
    initializeJourney(): Promise<void>;
    markMilestoneCompleted(milestoneId: bigint): Promise<void>;
}
