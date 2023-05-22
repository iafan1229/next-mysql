import React, { PropsWithChildren } from 'react';
import Header from './header';
const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};
export default Layout;
