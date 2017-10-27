package com.tamilniruvanam.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//@ConditionalOnProperty("security.basic.enabled")
@Configuration
@EnableWebSecurity
public class WebSecurityConfigAD extends WebSecurityConfigurerAdapter {

	@Value("${ad.domain}")
	private String AD_DOMAIN;

	@Value("${ad.url}")
	private String AD_URL;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		 /*http.authorizeRequests().anyRequest().authenticated().and().formLogin().permitAll();*/

		/*http.headers().
		contentSecurityPolicy("default-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' 'unsafe-inline'; child-src 'self' 'unsafe-inline';").and()
		 .frameOptions()
		 .sameOrigin()
		   .httpStrictTransportSecurity().disable()
		   .and()
		   .csrf()
		   .csrfTokenRepository(csrfTokenRepository())
           .and()
           .addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
        .authorizeRequests()
            .antMatchers("/resources/**", "/static/**").permitAll()
            .anyRequest().authenticated()
            .and()
        .formLogin()
            .loginPage("/login")
            .permitAll()
            .and()
        .logout()
        	.permitAll();*/


		http
	      /*.headers()
	      .contentSecurityPolicy("default-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' 'unsafe-inline'; child-src 'self' 'unsafe-inline'; frame-src *;").and()
			 .frameOptions()
			 .sameOrigin()
			   .httpStrictTransportSecurity().disable()
	      .and()*/
	      .authorizeRequests()
          .antMatchers("/**", "/resources/**", "/static/**", "/h2-console/**").permitAll()
          .anyRequest().authenticated()
          .and()
      .formLogin()
          .loginPage("/login")
          .permitAll()
          .and()
      .logout()
      	.permitAll().and()
      	.csrf()
      	.ignoringAntMatchers("/h2-consloe/**")
		.csrfTokenRepository(csrfTokenRepository())
        .and()
        .addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
        .authorizeRequests();

	}

	@Override
	protected void configure(AuthenticationManagerBuilder authManagerBuilder) throws Exception {
		System.out.println("configure------------AuthenticationManagerBuilder----------");
		authManagerBuilder.authenticationProvider(activeDirectoryLdapAuthenticationProvider())
				.userDetailsService(userDetailsService());
	}

	@Bean
	public AuthenticationManager authenticationManager() {
		System.out.println("configure--------authenticationManager--------------");
		return new ProviderManager(Arrays.asList(activeDirectoryLdapAuthenticationProvider()));
	}

	@Bean
	public AuthenticationProvider activeDirectoryLdapAuthenticationProvider() {
		System.out.println("configure----------------------" + AD_DOMAIN);
		ActiveDirectoryLdapAuthenticationProvider provider = new ActiveDirectoryLdapAuthenticationProvider(AD_DOMAIN,
				AD_URL);
		provider.setConvertSubErrorCodesToExceptions(true);
		provider.setUseAuthenticationRequestCredentials(true);

		return provider;
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		//web.ignoring().antMatchers("/*");
		//web.ignoring().antMatchers("/*.js");
	}

	private Filter csrfHeaderFilter() {
        return new OncePerRequestFilter() {

			@Override
			protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
					throws ServletException, IOException {
				CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
                if (csrf != null) {
                    Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
                    String token = csrf.getToken();
                    if (cookie == null || token != null && !token.equals(cookie.getValue())) {
                        cookie = new Cookie("XSRF-TOKEN", token);
                        cookie.setPath("/");
                        //cookie.setHttpOnly(true);
                        response.addCookie(cookie);
                    }
                }
                filterChain.doFilter(request, response);

			}
		};
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

}