// ConsolePrompt.js
import { LitElement, html, css, property } from '../lit';

export class ConsolePrompt extends LitElement
{

    static styles = css`
    :host {
      display: block;
      border: 1px solid #ddd;
      padding: 16px;
      font-family: 'Courier New', monospace;
      max-width: 600px;
      margin: 20px auto;
      background-color: #333;
      border-radius: 5px;
    }

    .output {
      padding: 8px 0;
      color: #0DFF00; /* Bright green for that classic console look */
      padding: 10px;
    }

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }

    input {
      width: 100%;
      padding: 8px;
      margin-top: 16px;
      border-radius: 5px;
      border: 1px solid #0DFF00; /* Green border */
      color: #0DFF00; /* Green text */
      background-color: #333; /* Dark background */
      caret-color: #0DFF00; /* Green caret */
      outline: none; /* Remove default focus style */

      /* Add blinking animation to the caret */
      &:focus {
        animation: blink 1s infinite;
      }
    }
  `;

    @property({ type: Array }) commands: any[] = [];

    constructor()
    {
        super();
    }

    handleCommand(e)
    {
        if (e.keyCode === 13)
        {
            const command = e.target.value;
            this.commands = [...this.commands, { command, response: "Executed: " + command }];
            e.target.value = '';
            this.requestUpdate();
        }
    }

    render()
    {
        return html`
      <div class="output">
        ${this.commands.map(cmd => html`
          <div>$ ${cmd.command}</div>
          <div>${cmd.response}</div>
        `)}
      </div>
      <input type="text" @keyup="${this.handleCommand}" placeholder="Enter command...">
    `;
    }
}

customElements.define('console-prompt', ConsolePrompt);
