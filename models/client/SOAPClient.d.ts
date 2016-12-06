export declare class SOAPClient {
    static process(options: any, target: any, key: string): void;
    private static callClientOperation(operation, client, args, options);
    private static createClient(options);
}
