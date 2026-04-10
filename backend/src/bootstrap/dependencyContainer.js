let dependencies = null;

export const setDependencies = (nextDependencies) => {
    dependencies = nextDependencies;
};

export const getDependencies = () => {
    if (!dependencies) {
        throw new Error("Dependencies are not initialized.");
    }

    return dependencies;
};
