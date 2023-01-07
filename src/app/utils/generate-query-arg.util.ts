export function generateQueryParams(queryparams: any = {}): string {
    const queryparamsArray: string[] = [];
    for (const key in queryparams) {
        queryparamsArray.push(key + '=' + encodeURIComponent(queryparams[key]));
    };

    const queryString: string = queryparamsArray.join('&');
    return queryString;
}