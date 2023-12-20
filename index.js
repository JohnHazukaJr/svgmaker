

const fs = require('fs');

async function main() {
    try {
        // Dynamically import the inquirer module
        const inquirer = await import('inquirer');
        const { prompt } = inquirer.default;

        // Dynamically import the SvgGenerator class
        const SvgGenerator = (await import('./lib/svgGenerator.js')).default;

        // User prompts
        const answers = await prompt([
            {
                type: "input",
                name: "text",
                message: "Enter your text (up to 3 characters):",
                validate: input => input.length <= 3 ? true : 'Text must be up to 3 characters.'
            },
            {
                type: "input",
                name: "textColor",
                message: "Choose text color (e.g., 'red' or '#FF5733'):",
                default: "black"
            },
            {
                type: "list",
                name: "shape",
                message: "Choose a shape:",
                choices: ["Circle", "Square", "Triangle"],
                default: "Circle"
            },
            {
                type: "input",
                name: "shapeColor",
                message: "Enter the color for the shape (e.g., 'blue' or '#0000FF'):",
                default: "black"
            },
            {
                type: "input",
                name: "backgroundColor",
                message: "Choose background color (e.g., 'white' or '#FFFFFF'):",
                default: "white"
            }
        ]);

        // Create SVG generator instance
        const svgGenerator = new SvgGenerator();

        // Set properties based on user input
        svgGenerator.setShape(answers.shape, answers.shapeColor);
        svgGenerator.setText(answers.text, answers.textColor);
        svgGenerator.setBackgroundColor(answers.backgroundColor);

        // Generate SVG content
        const svgContent = svgGenerator.generateSVG();

        // Write SVG content to a file
        const filePath = 'logo.svg';
        fs.writeFileSync(filePath, svgContent);
        console.log(`Generated logo.svg`);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();

