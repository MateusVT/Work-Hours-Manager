type Cookie = "accessToken"

class Cookies {
	static get(cookie: Cookie) {
		const value = `; ${document.cookie}`
		const parts = value.split(`; ${cookie}=`)

		if (parts.length !== 2) {
			return null
		}

		return decodeURIComponent(parts[1].split(";")[0])
	}

	static getNumber(cookie: Cookie) {
		const str = this.get(cookie)

		if (str == null) {
			return null
		}

		const value = Number(str)

		return !Number.isNaN(value) ? value : null
	}

	static getObject<E = any>(cookie: Cookie): E | null {
		const str = this.get(cookie)

		return str != null ? (JSON.parse(str) as E) : null
	}

	static set(cookie: Cookie, value: any | null, session?: boolean) {
		if (value != null) {
			if (typeof value === "object") {
				value = JSON.stringify(value)
			} else {
				value = encodeURIComponent(value)
			}
		}

		if (value != null) {
			if (session) {
				document.cookie = `${cookie}=${value}; path=/`
			} else {
				const expiration = new Date(2100, 1, 1)

				document.cookie = `${cookie}=${value}; expires=${expiration.toUTCString()}; path=/`
			}
		} else {
			document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`
		}
	}
}

export default Cookies
