package com.pilot.watchstore.config;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/customers/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ROLE_PREFIX = "ROLE_";
    public static final long EXPIRATION_TIME = 900_000_000; //300 seconds
    public static final long REMEMBER_ME_EXP_TIME = 50_000_000; // 300.000

}
