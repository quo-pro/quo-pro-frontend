import { Button, ButtonProps } from '@components/ui/button'
import React, { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUser } from '@quo-pro/commons'
import { CircleUser } from 'lucide-react'
import { cn } from '@lib/utils'

type Props = React.HTMLAttributes<HTMLButtonElement | SVGAElement> & {
    user: IUser;
}

export const ProfilePhoto = ({ user, className, ...rest }: Partial<Props>) => {
    const fallback = useMemo(() => {
        const names = user?.displayName.split(' ');

        if (names && names.length > 0) {
            if (names.length > 1 && names[1]) {
                return `${names[0]?.charAt(0)}${names[1]?.charAt(0)}`;
            }
            return `${names[0]?.charAt(0)}`;
        }

    }, [user?.displayName]);

    return (
        <Button variant="secondary" size="icon" className={cn("rounded-full w-fit h-fit p-2", className)} {...rest}>
            {
                user ?
                    <Avatar className='h-6 w-6'>
                        <AvatarImage src={user?.profilePhoto} />
                        <AvatarFallback className='uppercase'>{fallback}</AvatarFallback>
                    </Avatar> :
                    <CircleUser className="h-5 w-5" />
            }
        </Button>
    )
}
