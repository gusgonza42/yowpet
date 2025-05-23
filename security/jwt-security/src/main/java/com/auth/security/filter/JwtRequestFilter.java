package com.auth.security.filter;

import com.auth.security.util.JwtTokenUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro para procesar solicitudes HTTP y validar tokens JWT.
 */
@SuppressWarnings( "NullableProblems" )
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtTokenUtils jwtTokenUtils;

    /**
     * Constructor de JwtRequestFilter.
     *
     * @param jwtTokenUtils Utilidad para la gestión de tokens JWT.
     */
    public JwtRequestFilter( JwtTokenUtils jwtTokenUtils ) {
        this.jwtTokenUtils = jwtTokenUtils;
    }

    /**
     * Método para filtrar y procesar solicitudes HTTP.
     * <p>
     * Este método se encarga de extraer el token JWT del encabezado de autorización de la solicitud HTTP,
     * validar el token y, si es necesario, refrescarlo. Si el token es válido, se establece la autenticación
     * en el contexto de seguridad de Spring.
     *
     * @param request     la solicitud HTTP
     * @param response    la respuesta HTTP
     * @param filterChain la cadena de filtros
     * @throws ServletException si ocurre un error en el servlet
     * @throws IOException      sí ocurre un error de entrada/salida
     */
    @Override
    protected void doFilterInternal( HttpServletRequest request , HttpServletResponse response , FilterChain filterChain )
            throws ServletException, IOException {
        String authorizationHeader = request.getHeader( "Authorization" );
        String token = null;

        if ( authorizationHeader != null && authorizationHeader.startsWith( "Bearer " ) ) {
            token = authorizationHeader.substring( 7 );
        }

        try {
            if ( token != null ) {
                if ( jwtTokenUtils.isTokenExpired( token ) ) {
                    String refreshedToken = jwtTokenUtils.refreshToken( jwtTokenUtils.extractUsername( token ) );
                    response.setHeader( "Authorization" , "Bearer " + refreshedToken );
                } else if ( jwtTokenUtils.isTokenNearExpiry( token ) ) {
                    String refreshedToken = jwtTokenUtils.refreshToken( jwtTokenUtils.extractUsername( token ) );
                    response.setHeader( "Authorization" , "Bearer " + refreshedToken );
                    UsernamePasswordAuthenticationToken auth = jwtTokenUtils.getAuthentication( refreshedToken );
                    SecurityContextHolder.getContext( ).setAuthentication( auth );
                } else if ( jwtTokenUtils.isValidToken( token ) ) {
                    UsernamePasswordAuthenticationToken auth = jwtTokenUtils.getAuthentication( token );
                    SecurityContextHolder.getContext( ).setAuthentication( auth );
                }
            }
        } catch ( Exception e ) {
            response.sendError( HttpServletResponse.SC_UNAUTHORIZED , "Invalido o el token esta caducado" );
            return;
        }

        filterChain.doFilter( request , response );
    }
}