import { Construct } from "@aws-cdk/core";
export declare class NonConstruct {
    readonly scope: Construct;
    readonly id: string;
    constructor(scope: Construct, id: string);
    mixNameWithId(name: string): string;
}
