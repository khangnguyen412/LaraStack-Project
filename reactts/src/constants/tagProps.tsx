export const color: React.FC<{ roles: { id: number; name: string } }> = ({ roles }) => {
    if (roles?.id === 1) { return 'volcano'; }
    else if (roles?.id === 2) { return 'blue'; }
    else if (roles?.id === 3) { return 'green'; }
}