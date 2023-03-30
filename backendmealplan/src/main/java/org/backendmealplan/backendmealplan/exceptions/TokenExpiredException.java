package org.backendmealplan.backendmealplan.exceptions;

public class TokenExpiredException extends Exception{

    public TokenExpiredException(String message) {
        super(message);
    }
}
