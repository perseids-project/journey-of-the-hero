from app.configurations.language import language
from app.configurations.modules import modules


# Instead of json, we are going the py road so we can comment configurations and lessen the load time as well...
config = {}
config["language"] = language
config["modules"] = modules


def get(key):
    """
    @param  key  string  Key representing the subset of configurations concerned
    @type
    @returns function
    """
    return lambda s: config[key][s]
