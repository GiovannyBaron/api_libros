from pathlib import Path


def current_dir(file):
    return Path(file).parent.absolute()
