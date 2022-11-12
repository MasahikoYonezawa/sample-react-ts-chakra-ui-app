import { FC, memo, useEffect } from 'react';
import { Wrap, WrapItem, Spinner, Center } from '@chakra-ui/react';

import { UserCard } from '../organisms/user/UserCard';
import { useAllUsers } from '../../hooks/useAllUsers';

export const UserManagement: FC = memo(() => {
    const { getUsers, users, loading } = useAllUsers();

    useEffect(() => getUsers(), []);

    return (
        <>
            {loading ? (
                <Center h="100vh">
                    <Spinner />
                </Center>
            ) : (
                <Wrap p={{ base: 4, md: 10 }}>
                    {users.map((user) => (
                        <WrapItem key={user.id} mx="auto">
                            <UserCard
                                imageUrl="https://source.unsplash.com/random"
                                userName={user.username}
                                fullName={user.name}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            )}
        </>
    );
});
