export const filterWithFormat = (files: string[], formats: string[]) =>
    files
        .filter(fileName =>
            formats
                .includes(fileName
                    .split('.')
                    .at(-1)
                    ?? ''
                )
        );