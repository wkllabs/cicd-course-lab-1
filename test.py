import sys

def check_requirements():
    # Load requirements from requirements.txt
    try:
        with open("requirements.txt", "r") as f:
            requirements = [line.strip().split("==")[0] for line in f if line.strip() and not line.startswith("#")]
    except FileNotFoundError:
        print("Error: requirements.txt file not found.")
        sys.exit(1)

    # Check if each requirement can be imported
    missing_packages = []
    for package in requirements:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)

    # Print result
    if missing_packages:
        print("The following packages are missing or failed to import:")
        for pkg in missing_packages:
            print(f"- {pkg}")
        sys.exit(1)
    else:
        print("All requirements are installed and can be imported successfully.")

if __name__ == "__main__":
    check_requirements()
 
