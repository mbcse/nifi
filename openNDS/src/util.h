/********************************************************************\
 * This program is free software; you can redistribute it and/or    *
 * modify it under the terms of the GNU General Public License as   *
 * published by the Free Software Foundation; either version 2 of   *
 * the License, or (at your option) any later version.              *
 *                                                                  *
 * This program is distributed in the hope that it will be useful,  *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of   *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the    *
 * GNU General Public License for more details.                     *
 *                                                                  *
 * You should have received a copy of the GNU General Public License*
 * along with this program; if not, contact:                        *
 *                                                                  *
 * Free Software Foundation           Voice:  +1-617-542-5942       *
 * 59 Temple Place - Suite 330        Fax:    +1-617-542-2652       *
 * Boston, MA  02111-1307,  USA       gnu@gnu.org                   *
 *                                                                  *
\********************************************************************/

/** @file util.h
    @brief Misc utility functions
    @author Copyright (C) 2004 Philippe April <papril777@yahoo.com>
    @author Copyright (C) 2015-2024 Modifications and additions by BlueWave Projects and Services <opennds@blue-wave.net>
*/

#ifndef _UTIL_H_
#define _UTIL_H_

#define MIN(X, Y) (((X) < (Y)) ? (X) : (Y))
#define MAX(X, Y) (((X) > (Y)) ? (X) : (Y))

/* @brief Execute a shell command */
int execute(const char fmt[], ...);
int execute_ret(char* msg, int msg_len, const char fmt[], ...);
int execute_ret_url_encoded(char* msg, int msg_len, const char *cmd);

/* @brief Check heartbeat */
int check_heartbeat();

/* @brief Get Option from Config */
int get_option_from_config(char* msg, int msg_len, const char *option);

/* @brief Get List from Config */
int get_list_from_config(char* msg, int msg_len, const char *list);

/* @brief Get IP address of an interface */
char *get_iface_ip(const char ifname[], int ip6);

/* @brief Get MAC address of an interface */
char *get_iface_mac(const char ifname[]);

/* @brief Online/offline checking */
int check_routing(int watchdog);

/* @brief Format a time_t value to 'Fri Jul 27 18:52:22 2018' */
char *format_time(time_t time, char buf[64]);

/* @brief Check if the address is a valid IPv4 or IPv6 address */
int is_addr(const char* addr);

/* @brief Returns System Uptime in seconds */
time_t get_system_uptime();

/* @brief Returns the hash of a string */
int hash_str(char *buf, int hash_len, const char *src);

// @brief Downloads remote files specified in the configured themespec
int download_remotes(int refresh);

// @brief locks ndsctl
int ndsctl_lock();

// @brief unlocks ndsctl
void ndsctl_unlock();

// @brief startdaemon
int startdaemon(char *cmd, int daemonpid);

// @brief count substrings
int count_substrings(char* string, char* substring);

// @brief stopdaemon
int stopdaemon(int daemonpid);

// @brief write_ndsinfo
void write_ndsinfo(void);

/* @brief writes an element or elements of client info to the cidfile,
 * mode can be:
 * write (write the info)
 * or
 * parse (parse the info string for multiple elements and write)
 */
int write_client_info(char* msg, int msg_len, const char *mode, const char *cid, const char *info);

/* @brief Returns the client local interface,
 * meshnode mac address (null if mesh not present) and
 * local mesh interface (null if mesh not present)
 */
int get_client_interface(char* clientif, int clientif_len, const char *climac);

/*
 * @brief Mallocs and returns opennds uptime string
 */
char *get_uptime_string(char buf[64]);

/*
 * @brief Writes a human-readable paragraph of the status of the opennds process
 */
void ndsctl_status(FILE *fp);

/*
 * @brief Writes a machine-readable dump of currently connected clients
 */
void ndsctl_clients(FILE *fp);

/*
 * @brief Writes a machine-readable json of currently connected clients
 */
void ndsctl_json(FILE *fp, const char *arg);

/** @brief cheap random */
unsigned short rand16(void);

/*
 * @brief Maximum <host>:<port> length (IPv6)
 * - INET6_ADDRSTRLEN: 46 (45 chars + term. Null byte)
 * - square brackets around IPv6 address: 2 ('[' and ']')
 * - port separator character: 1 (':')
 * - max port number: 5 (2^16 = 65536)
 * Total: 54 chars
 **/
#define MAX_HOSTPORTLEN ( INET6_ADDRSTRLEN + sizeof("[]:65536")-1 )

#endif /* _UTIL_H_ */
