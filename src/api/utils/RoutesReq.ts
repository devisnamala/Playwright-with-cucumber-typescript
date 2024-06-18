export class RoutesReq {
    public static readonly BASE_URI: string = "https://reqres.in/";

    // Define endpoints as static readonly properties
    public static readonly list_users: string = "https://reqres.in/api/users?page=2";
    public static readonly Single_user: string = RoutesReq.BASE_URI + "api/users/2";
    public static readonly User_not_found: string = RoutesReq.BASE_URI + "api/users/23";
    public static readonly list_resource: string = RoutesReq.BASE_URI + "api/unknown";
    public static readonly single_resource: string = RoutesReq.BASE_URI + "api/unknown/2";
    public static readonly single_resource_not_found: string = RoutesReq.BASE_URI + "api/unknown/23";

    // Post requests
    public static readonly create: string = RoutesReq.BASE_URI + "api/users";

    // Put and patch requests
    public static readonly Update: string = RoutesReq.BASE_URI + "api/users/2";

    // Delete requests
    public static readonly DeleteUser: string = RoutesReq.BASE_URI + "api/users/2";

    // Additional post requests
    public static readonly Register_successful: string = RoutesReq.BASE_URI + "api/register";
    public static readonly Login_user: string = RoutesReq.BASE_URI + "api/login";

    // Delayed user request
    public static readonly Delay_user: string = RoutesReq.BASE_URI + "api/users?delay=3";
}
