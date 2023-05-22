import React, { PropsWithChildren } from 'react';
import Header from './header';
const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
};
export default Layout;
