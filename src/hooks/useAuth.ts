import { useCallback, useState } from 'react';
import axios from 'axios';

import { User } from '../types/api/user';
import { useHistory } from 'react-router-dom';
import { useMessage } from './useMessage';
import { useLoginUser } from './providers/useLoginUserProvider';

export const useAuth = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { showMessage } = useMessage();
    const { setLoginUser } = useLoginUser();

    const login = useCallback(
        (id: string) => {
            setLoading(true);
            axios
                .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(async (res) => {
                    if (res.data) {
                        // contextにログインユーザーの情報を保存
                        // サンプル的にidが10のユーザーを管理者としてみる
                        const isAdmin = res.data.id === 10;
                        console.log(res.data);
                        setLoginUser({ ...res.data, isAdmin });
                        showMessage({
                            title: 'ログインしました',
                            status: 'success',
                        });
                        history.push('/home');
                    } else {
                        showMessage({
                            title: 'ユーザーが見つかりません',
                            status: 'error',
                        });
                        setLoading(false);
                    }
                })
                .catch(() => {
                    showMessage({
                        title: 'ログインできません',
                        status: 'error',
                    });
                    setLoading(false);
                });
        },
        [history, showMessage, setLoginUser]
    );
    return { login, loading };
};
